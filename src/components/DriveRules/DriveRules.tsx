import React, { FC, useState, useMemo, useEffect } from 'react'
import { Grid, Box, Collapse } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core'

import BlockHeader from '~/components/BlockHeader'
import Frame from '~/components/frame'
import RighSideBtn from '~/components/RightSideBtn'
import { Text, Flexbox } from '~/components/shared'
import FullOnMobile from '~/components/layouts/FullOnMobile'

import { ReactComponent as Good } from '~/assets/icons/checkGood.svg'
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate'
import { ReactComponent as Bad } from '~/assets/icons/checkBad.svg'

import mg from './DriveRules.messages'
import { Skeleton } from '@material-ui/lab'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      mark: {
        padding: '5px 15px 0 0'
      },
      rule: {
        color: theme.palette.text.primary
      }
    }),
  {
    name: 'DriveRules'
  }
)

interface RuleProps {
  rule?: string
  allowed?: boolean
  loading?: boolean
}
const Rule: FC<RuleProps> = ({ rule, allowed, loading }) => {
  const classes = useStyle()

  return (
    <Flexbox key={rule} mb={2}>
      <Box className={classes.mark}>
        {allowed ? <AssignmentLateIcon /> : <Bad />}
      </Box>
      {loading ? (
        <Box width="100%">
          <Skeleton width="100%" />
          <Skeleton width="100%" />
        </Box>
      ) : (
        <Text className={classes.rule}>{rule}</Text>
      )}
    </Flexbox>
  )
}

interface DriveRulesProps {
  rules: string[] | any
  loading?: boolean
  title?: string
}

const placeholder = new Array(2).fill({})

const DriveRules: FC<DriveRulesProps> = ({
  rules,
  loading,
  title
}): JSX.Element => {
  const [seeAll, setSeeAll] = useState(false)

  const handleToggle = () => setSeeAll(!seeAll)

  const allowed = useMemo(() => {
    if (rules) {
      const allowed = [...rules]
      // const not_allowed = [...rules.not_allowed]
      return {
        preview: allowed.splice(0, 2),
        other: allowed
      }
    }

    return {}
  }, [rules])

  return (
    <>
      <BlockHeader translateMessageObj={title} />
      <FullOnMobile>
        <Frame>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {(loading ? placeholder : allowed?.preview)?.map(
                (rule, index) => {
                  return (
                    <Rule key={index} rule={rule} loading={loading} allowed />
                  )
                }
              )}
              <Collapse in={seeAll}>
                {allowed?.other?.map((rule) => (
                  <Rule key={rule} rule={rule} loading={loading} allowed />
                ))}
              </Collapse>
            </Grid>
            {/* <Grid item xs={12} md={6}>
              {(loading ? placeholder : not_allowed?.preview)?.map(
                (rule, index) => (
                  <Rule key={index} rule={rule} loading={loading} />
                )
              )}
              <Collapse in={seeAll}>
                {not_allowed?.other?.map((rule) => (
                  <Rule key={rule} rule={rule} loading={loading} />
                ))}
              </Collapse>
                </Grid>*/}
          </Grid>
          {!allowed?.preview?.length && !loading && <Text>No Articles</Text>}
          {!loading && !!allowed?.other?.length && (
            <RighSideBtn
              onClick={handleToggle}
              translateObj={seeAll ? mg['showLess'] : mg['seeAll']}
            />
          )}
        </Frame>
      </FullOnMobile>
    </>
  )
}

export default DriveRules
