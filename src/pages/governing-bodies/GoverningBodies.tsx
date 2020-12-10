import { Grid, Box, Tabs, Tab } from '@material-ui/core'
import React from 'react'
import AssignmentIcon from '@material-ui/icons/Assignment'

import { Flexbox, Text } from '../../components/shared'
import recentNews from '../../data/mocks/recent-news'
import HeroBlock from '../home/HeroBlock'

import useStyle from './GoverningBodies.style'
import Frame from '../../components/frame'
import subGovernongPeople from '../../data/mocks/subGovernongPeople'
import subSuoervisoryPeople from '../../data/mocks/subSuoervisoryPeople'

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children} </>}
    </div>
  )
}

export default function GoverningBodies() {
  const classes = useStyle()
  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      <HeroBlock>Керівні органи</HeroBlock>
      <Box>
        <Tabs
          value={value}
          indicatorColor="primary"
          onChange={handleChange}
          aria-label="simple tabs"
          centered
        >
          <Tab
            className={classes.heading}
            label="Правління"
            {...a11yProps(0)}
          />
          <Tab
            className={classes.heading}
            label="Наглядова Рада"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <Box p={4} mt={3} textAlign="center">
        <Frame shadow={2}>
          <Text variant="h3" fontWeight={500} mb={2}>
            Виконавчий директор:{' '}
            <Text component="span" fontWeight={700}>
              к.т.н., доцент Чередніченко О.Ю.
            </Text>
          </Text>
          <Text variant="body1">
            Національний технічний університет «Харківський політехнічний
            інститут»
          </Text>
        </Frame>
      </Box>

      <TabPanel value={value} index={0}>
        <Grid container justify="center">
          <Grid item sm={12}>
            <Box p={4} mt={3} textAlign="center">
              <Frame shadow={2}>
                <Text variant="h3" fontWeight={500} mb={2}>
                  Голова Правління – Президент:{' '}
                  <Text component="span" fontWeight={700}>
                    д.т.н., професор Харченко В.С.
                  </Text>
                </Text>
                <Text variant="body1">
                  Національний аерокосмічний університет імені М. Є. Жуковського
                  «Харківський авіаційний інститут»
                </Text>
              </Frame>
            </Box>
          </Grid>
          {subGovernongPeople.map((item) => (
            <Grid item sm={12} md={4}>
              <Box p={4} mt={3} textAlign="center">
                <Frame
                  shadow={1}
                  hover={2}
                  minHeight={160}
                  style={{ background: '#929292', color: '#FFF' }}
                >
                  <Text variant="h3" fontWeight={500} mb={2}>
                    {item.position}
                  </Text>
                  <Text variant="body1">{item.university}</Text>
                </Frame>
              </Box>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container justify="center">
          <Grid item sm={12}>
            <Box p={4} mt={3} textAlign="center">
              <Frame shadow={2}>
                <Text variant="h3" fontWeight={500} mb={2}>
                  Голова Наглядової Ради:{' '}
                  <Text component="span" fontWeight={700}>
                    д.т.н., професор Кондратенко Ю.П.,
                  </Text>
                </Text>
                <Text variant="body1">
                  Чорноморський національний університет імені Петра Могили
                </Text>
              </Frame>
            </Box>
          </Grid>
          {subSuoervisoryPeople.map((item) => (
            <Grid item sm={12} md={4}>
              <Box p={4} mt={3} textAlign="center">
                <Frame
                  shadow={1}
                  hover={2}
                  minHeight={160}
                  style={{ background: '#929292', color: '#FFF' }}
                >
                  <Text variant="h3" fontWeight={500} mb={2}>
                    {item.position}
                  </Text>
                  <Text variant="body1">{item.university}</Text>
                </Frame>
              </Box>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </div>
  )
}
