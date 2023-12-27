import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { Approval, Rejection } from "@/domain/TransactionProposed";
import {
  OwnersWithAction,
  OwnerWithAction,
} from "@/domain/TransactionProposedItemUi";
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
}: Props): OwnersWithAction {
  const approvers: OwnerWithAction[] = [];
  const rejectorsList: OwnerWithAction[] = [];

  owners.forEach((owner) => {
    const _ownerAddress = formatAddressForNetwork(owner.address, network);

    const approval = approvals.find(
      (approval) => approval.approver === _ownerAddress
    );
    if (approval) {
      approvers.push({
        address: approval.approver,
        name: owner.name,
        actionTimestamp: approval.approvalTimestamp,
      });
    }

    const rejection = rejectors.find(
      (rejection) => rejection.rejector === _ownerAddress
    );
    if (rejection) {
      rejectorsList.push({
        address: rejection.rejector,
        name: owner.name,
        actionTimestamp: rejection.rejectionTimestamp,
      });
    }
  });

  return { approvers, rejectors: rejectorsList };
}
