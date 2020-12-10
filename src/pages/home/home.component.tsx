import React, { FC, useEffect, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  List
} from '@material-ui/core'
import { FormattedMessage, useIntl } from 'react-intl'
import { Deserializer } from 'jsonapi-serializer'
import Divider from '@material-ui/core/Divider'
import AssignmentIcon from '@material-ui/icons/Assignment'
import AdjustIcon from '@material-ui/icons/Adjust'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { Text, ListItem, Flexbox } from '~/components/shared'
import TestMee from '~/services/TestMee'

import HeroBlock from './HeroBlock'
import NewsCard from './NewsCard'
import mg from './home.messages'

import useStyle from './home.style'
import Frame from '../../components/frame'

import recentNews from '../../data/mocks/recent-news'
import acordionDetails from '../../data/mocks/acordion-details'

const scope = 'pages.home.banner'

const Home: FC = (): JSX.Element => {
  const classes = useStyle()
  const { locale } = useIntl()

  const [listings, setListings] = useState<{ listing: []; promoted: [] }>({
    listing: [],
    promoted: []
  })

  return (
    <>
      <HeroBlock>Ukrainian Scientific IT Society</HeroBlock>
      <Grid container>
        <Grid item sm={12} md={8}>
          <Box mt={4} mx={5}>
            <Text variant="h2" mb={2}>
              Мета
            </Text>
            <Text variant="subtitle1">
              Громадська організація{' '}
              <strong>«Українське науково-освітнє ІТ товариство»</strong> є
              добровільним об’єднанням фізичних осіб, створеним для:
            </Text>
            <Text my={3}>
              <AdjustIcon style={{ width: 20, verticalAlign: 'middle' }} />{' '}
              сприяння успішному розвитку вищої освіти, наукових досліджень і
              розробок у галузі інформаційних технологій в Україні, ефективній
              взаємодії з профільними індустріальними підприємствами і
              організаціями, міжнародній кооперації для виконання спільних
              науково-освітніх проектів;
            </Text>
            <Text my={3}>
              <AdjustIcon style={{ width: 20, verticalAlign: 'middle' }} />{' '}
              підвищення впливу науково-педагогічної спільноти на формування і
              реалізацію стратегії розвитку вищої освіти в цілому і з
              інформаційних технологій, зокрема.
            </Text>
          </Box>
          <Box p={4} mt={3}>
            {acordionDetails.map((item) => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${item.id}a-content`}
                  id={`panel${item.id}a-header`}
                >
                  <Text className={classes.heading}>{item.title}</Text>
                </AccordionSummary>
                <AccordionDetails>
                  <Text>{item.description}</Text>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Grid>

        <Grid item md={4} spacing={2}>
          <Flexbox justifyContent="flex-end" alignItems="center" m={4}>
            <AssignmentIcon />
            <Text ml={2} variant="h3" fontWeight={700}>
              Недавні записи
            </Text>
          </Flexbox>
          <Box>
            {recentNews.map((item) => (
              <Box m={1.5} textAlign="right">
                <NewsCard {...item} />
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Home
