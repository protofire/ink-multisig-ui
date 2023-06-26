import { Grid, Typography } from "@mui/material"
import { AbiMessage } from "@polkadot/api-contract/types"
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Registry, TypeDef } from "@/services/substrate/types";
import { encodeTypeDef } from '@polkadot/types/create';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  arg: { name?: string; type: TypeDef };
  registry: Registry;
  value?: string;
}

const MAX_PARAM_LENGTH = 20;

function truncate(param: string): string {
  return param.length > MAX_PARAM_LENGTH
    ? `${param.substring(0, MAX_PARAM_LENGTH / 2)}…${param.substring(
        param.length - MAX_PARAM_LENGTH / 2
      )}`
    : param;
}


export function ArgSignature({
  arg: { name, type },
  children,
  className,
  registry,
  value,
  ...props
}: Props) {
  return (
    <span >
      {name ? `${name}: ` : ''}
      <span>
        {value ? <b>{truncate(value)}</b> : type.typeName || encodeTypeDef(registry, type)}
      </span>
      {children}
    </span>
  );
}


export const FunctionSignature = ({item, registry, params = []}: 
  {item: AbiMessage, registry: Registry, params?: unknown[]}): JSX.Element => {
    const {args} = item

    return (<Grid container alignItems="center" gap={1}>
      {item.isMutating ? <HistoryEduIcon />  : <AutoStoriesIcon />}
  
      <Grid item xs>
        <Typography variant="body2">{item.method}</Typography>
  
        <Typography variant="caption" component="p">
        (
          {args?.map((arg, index): React.ReactNode => {
            return (
              <ArgSignature
                arg={arg}
                key={`args-${index}`}
                registry={registry}
                value={params[index] ? (params[index] as string) : undefined}
              >
                {index < args.length - 1 && ', '}
              </ArgSignature>
            );
          })}
          )
        </Typography>
      </Grid>
    </Grid>)
  }
  