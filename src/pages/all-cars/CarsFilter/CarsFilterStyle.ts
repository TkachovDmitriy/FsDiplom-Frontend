import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {},
      filterParam: {
        border: '1px solid #BBC0C4',
        color: theme.palette.text.secondary,
        borderRadius: 30,
        padding: '9px 20px',
        marginRight: 10
      },
      clearButton: {
        textDecoration: 'underline',
        fontSize: 18
      },
      mobileSelect: {
        width: 'max-content',
        border: 'none',
        background: 'transparent !important',
        color: '#64696C',
        paddingRight: 8,
        '& .MuiSelect-select': {
          padding: '15px 0',
          paddingRight: '20px',
          fontSize: '15px',
          background: 'transparent !important'
        },
        '&:focus': {
          outline: 'none'
        },
        '& > fieldset': {
          borderColor: 'transparent !important',
          '&:focus': {
            outline: 'none'
          }
        },
        '& > svg': {
          top: 'calc(50% - 4px)',
          right: '8px',
          color: '#fff'
        }
      }
    }),
  {
    name: 'CarsFilter'
  }
)

export default useStyle
