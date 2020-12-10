import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box, makeStyles, createStyles, Theme, Button } from '@material-ui/core'
import { FormattedMessage, useIntl } from 'react-intl'

import { createLocalizedPath } from '~/utils/localizedPath'

import Frame from '../frame'
import { Text, Link } from '../shared'
import ConfirmationModal from '../dialogs/ConfirmationModal'
import RightSideBtn from '../RightSideBtn'

import mg from './DeleteAccount.messages'
import { deleteDealerAccount, deleteUserAccount } from '~/state/modules/user'
import { useRoles } from '~/constants/roles'
import { AppState } from '~/interfaces/redux'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {},
      deleteAccLink: {
        fontWeight: 'bold'
      },
      deleteAccount: {
        textDecoration: 'underline',
        fontWeight: 'bold',
        float: 'right'
      }
    }),
  {
    name: 'Profile'
  }
)

const DeleteAccount = () => {
  const classes = useStyle()
  const { locale } = useIntl()
  const history = useHistory()
  const dispatch = useDispatch()
  const { role } = useSelector((state: AppState) => state.user)

  const { isDealer } = useRoles(role)

  const deleteAccount = (): void => {
    dispatch(isDealer ? deleteDealerAccount() : deleteUserAccount())
    history.push(createLocalizedPath('/', locale))
  }

  return (
    <Box mb={9}>
      <Frame>
        <Text mb={3}>
          <FormattedMessage {...mg['deleteAccountRules']} />
        </Text>
        <Text>
          <FormattedMessage
            {...mg['deleteAccountProtected']}
            values={{
              // eslint-disable-next-line react/display-name
              pp: (chunk: any): JSX.Element => (
                <Link
                  to="/privacy-policy"
                  underline="none"
                  className={classes.deleteAccLink}
                >
                  {chunk}
                </Link>
              ),
              // eslint-disable-next-line react/display-name
              tos: (chunk: string): JSX.Element => (
                <Link
                  to="/terms-of-service"
                  underline="none"
                  className={classes.deleteAccLink}
                >
                  {chunk}
                </Link>
              )
            }}
          />
        </Text>
        <ConfirmationModal
          onConfirm={deleteAccount}
          translateKey="deletionAccount"
        >
          <RightSideBtn>
            <FormattedMessage {...mg['deleteAccButton']} />
          </RightSideBtn>
        </ConfirmationModal>
      </Frame>
    </Box>
  )
}

export default DeleteAccount
