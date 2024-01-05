import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { Approval, Rejection } from "@/domain/TransactionProposed";
import { OwnerWithAction } from "@/domain/TransactionProposedItemUi";
import { ChainId } from "@/services/useink/types";
import { formatAddressForNetwork } from "@/utils/blockchain";

interface Props {
  owners: SignatoriesAccount["owners"];
  approvals: Approval[];
  rejectors: Rejection[];
  network: ChainId;
}

export function mapOwnersToActions({
  owners,
  approvals,
  rejectors,
  network,
}: Props): OwnerWithAction[] {
  const _owners: OwnerWithAction[] = owners.map((owner) => ({
    ...owner,
    status: "Pending",
    actionTimestamp: null,
  }));

  _owners.forEach((owner, index) => {
    const _ownerAddress = formatAddressForNetwork(owner.address, network);

    const approval = approvals.find(
      (approval) => approval.approver === _ownerAddress
    );
    if (approval) {
      _owners[index] = {
        ..._owners[index],
        status: "Approved",
        actionTimestamp: approval.approvalTimestamp,
      };
    }

    const rejection = rejectors.find(
      (rejection) => rejection.rejector === _ownerAddress
    );
    if (rejection) {
      _owners[index] = {
        ..._owners[index],
        status: "Rejected",
        actionTimestamp: rejection.rejectionTimestamp,
      };
    }
  });

  return _owners;
}
