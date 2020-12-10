import React from 'react'
import { Box, Grid, makeStyles, createStyles, Theme } from '@material-ui/core'

import ContainerFull from './ContainerFull'
import Text from '../shared/Text'

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: (props: { imgSrc: string }) => ({
        backgroundImage: `url(${props.imgSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: theme.palette.common.white
      }),
      wrapper: {
        display: 'flex',
        justifyContent: 'center',
        minHeight: '450px',
        padding: '0 20px',

        [theme.breakpoints.down('xs')]: {
          minHeight: '580px'
        }
      },
      container: {
        minHeight: '100%',
        alignSelf: 'center'
      },
      textHead: {
        [theme.breakpoints.down('sm')]: {
          fontSize: '36px'
        }
      }
    }),
  { name: 'Banner' }
)

export type BannerProps = {
  title: string | React.ReactNode
  imgSrc: string
  subtitle?: string | React.ReactNode
}

const Banner: React.FC<BannerProps> = ({ imgSrc, children }): JSX.Element => {
  const s = useStyles({ imgSrc })

  return (
    <ContainerFull className={s.root} withContainer>
      <section className={s.wrapper}>
        <Grid
          container
          alignContent="center"
          alignItems="center"
          className={s.container}
        >
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" mb={{ xs: 2, md: 0 }}>
              <Text className={s.textHead} variant="h1" align="center">
                {children}
              </Text>
            </Box>
          </Grid>
        </Grid>
      </section>
    </ContainerFull>
  )
}

export default Banner
