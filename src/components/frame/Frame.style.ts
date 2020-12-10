import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        background: '#FFF',
        // border: '1px solid #BBC0C4',
        borderRadius: 10,
        boxShadow: (props: { shadow: number; hover: number }) =>
          props.shadow === 1
            ? '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
            : ' 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        overflow: 'auto',

        '&:hover': {
          boxShadow: (props: { shadow: number; hover: number }) =>
            props.hover === 1
              ? '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
              : props.hover === 2
              ? '0 14px 28px rgb(0 0 0 / 68%), 0 10px 10px rgba(0,0,0,0.22)'
              : ''
        },

        [theme.breakpoints.up('md')]: {
          borderRadius: 4
        }
      }
    }),
  {
    name: 'Frame'
  }
)

export default useStyle
