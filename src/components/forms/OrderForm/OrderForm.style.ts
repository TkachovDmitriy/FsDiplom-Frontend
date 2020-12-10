import { makeStyles, Theme, createStyles } from '@material-ui/core'

export const useStyleDesktop = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        background: '#FFF',
        borderRadius: 4,
        position: 'relative',
        border: '1px solid #BBC0C4',
        '& .MuiPickersCalendar-root': {
          minHeight: '235px'
        },
        '& .MuiPickersCalendarHeader-root': {
          position: 'relative',
          padding: '0 12px',
          '& .MuiTypography-subtitle1': {
            fontSize: (props: { large?: boolean }): any =>
              props.large ? 24 : 18
          },
          '& .MuiPickersArrowSwitcher-previousMonthButtonMargin': {
            left: '40px',
            right: '0 !important',
            margin: 0,
            width: '30px',
            ' .MuiSvgIcon-root': {
              width: '30px'
            }
          },
          '& .MuiPickersArrowSwitcher-iconButton': {
            position: 'absolute',
            top: 0,
            right: '40px',
            width: '30px',
            ' .MuiSvgIcon-root': {
              width: '30px'
            }
          },
          '& .MuiPickersCalendarHeader-monthTitleContainer': {
            cursor: 'auto',
            margin: '0 auto',
            order: 2,
            maxHeight: (props: { large?: boolean }): any =>
              props.large ? '100%' : 'inherit'
          },
          '& .Mui-selected:hower': {
            backgroundColor: '#F4BD42'
          }
        },
        '& .MuiPickersCalendar-daysHeader': {
          position: 'relative',
          zIndex: 1,
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '200%',
            height: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#EDEEF0',
            zIndex: -1
          }
        },

        '& .MuiPickersDay-root,': {
          fontSize: (props: { large?: boolean }): any => (props.large ? 16 : 12)
        },
        '& .MuiPickersCalendar-weekDayLabel': {
          fontSize: (props: { large?: boolean }): any => (props.large ? 18 : 12)
        },
        '& .MuiPickersDay-root.Mui-disabled': {
          color: '#BBC0C4'
        },
        '& .MuiPickersDay-root.Mui-selected': {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.text.primary
        },
        '& .MuiPickersBasePicker-pickerView': {
          width: '100% !important'
        },
        '& .MuiPickersStaticWrapper-root': {
          minWidth: '200px !important'
        },
        '& .MuiPickersCalendarView-viewTransitionContainer': {
          overflow: 'unset !important'
        }
      },
      stick: {},
      header: {
        background: theme.palette.primary.main,
        color: '#FFF',
        padding: '13px 20px'
      },
      ratingContainer: {
        textAlign: 'center',
        marginBottom: 20
      },
      toogleBtn: {
        margin: '20px 0',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridGap: '20px'
      },
      togBtn: {
        borderLeft: '1px solid #BBC0C4 !important',
        borderRadius: ' 4px !important',
        margin: 0,
        color: theme.palette.text.primary,
        minWidth: '50px',
        fontSize: (props: { large?: boolean }): number =>
          props.large ? 16 : 13,
        border: '1px solid #BBC0C4',
        '&.Mui-selected': {
          backgroundColor: `${theme.palette.secondary.main} !important`,
          color: `${theme.palette.text.primary} !important`
        },
        '&.bookedTime': {
          color: '#000 !important',
          fontWeight: 500,
          backgroundColor: 'rgb(43 41 41 / 35%) !important'
        }
      },
      submitButton: {
        width: '100%',
        minWidth: '180px',
        maxWidth: 380,
        marginTop: 8,
        marginBottom: 10
      },
      reviewBtn: {
        width: '100%',
        minWidth: '180px',
        marginTop: 8,
        marginBottom: 10
      },
      button: {
        border: '1px solid #BBC0C4',
        color: '#BBC0C4',
        '&:focus': {
          border: '1px solid #000000',
          color: '#000000'
        },
        '&:hover': {
          border: '1px solid #000000',
          color: '#000000'
        }
      },
      priceBadge: {
        color: theme.palette.text.primary
      }
    }),
  {
    name: 'DatePicker'
  }
)
