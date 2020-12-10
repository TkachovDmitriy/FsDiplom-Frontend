import {
  Grid,
  ListItem,
  List,
  Divider,
  ListItemIcon,
  ListItemText,
  Box
} from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'
import React from 'react'
import InfoIcon from '@material-ui/icons/Info'
import AdjustIcon from '@material-ui/icons/Adjust'
import ListAltIcon from '@material-ui/icons/ListAlt'
import parse from 'html-react-parser'

import Frame from '../../components/frame'
import { Flexbox, Text } from '../../components/shared'
import jobsList from '../../data/mocks/jobsList'
import HeroBlock from '../home/HeroBlock'
import stepsProcedure from '../../data/mocks/stepsProcedure'

export default function Regulations() {
  return (
    <div>
      <HeroBlock>Процедура набуття членства</HeroBlock>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          <Box m={2} p={2}>
            <embed
              src={
                'https://usit.eu.org/wp-content/uploads/2019/06/03_%D0%93%D0%9E-%D0%A3%D0%9D%D0%86%D0%A2-%D0%A1%D1%82%D0%B0%D1%82%D1%83%D1%82.pdf'
              }
              height={700}
              width={'100%'}
              type="application/pdf"
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}
