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

export default function MembershipProcedure() {
  return (
    <div>
      <HeroBlock>Процедура набуття членства</HeroBlock>
      <Grid container spacing={3} justify="center">
        <Grid item md={8}>
          <Frame margin={4}>
            <Text>
              Шановні колеги, запрошуємо Вас приєднатися до діяльності
              ГРОМАДСЬКОЇ ОРГАНІЗАЦІЇ «УКРАЇНСЬКЕ НАУКОВО-ОСВІТНЄ IT
              ТОВАРИСТВО», яка є добровільним професійним об’єднанням, створеним
              для сприяння розвитку вищої освіти, наукових досліджень і розробок
              у галузі інформаційних технологій.
            </Text>

            {stepsProcedure.map((item) => (
              <Flexbox alignItems="baseline">
                <AdjustIcon style={{ width: 20, verticalAlign: 'middle' }} />
                <Text m={2}>{parse(item.text)}</Text>
              </Flexbox>
            ))}

            <Text mb={2}>
              <InfoIcon style={{ width: 20, verticalAlign: 'middle' }} />{' '}
              Звернутися із запитаннями щодо діяльності Організації та процедури
              прийому нових членів можна на електронну адресу Організації
              (pouseit равлик gmail.com).
            </Text>

            <Box textAlign="center">
              <a href="https://usit.eu.org/wp-content/uploads/2020/11/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D0%B4%D1%96%D0%B9%D1%81%D0%BD%D0%B8%D1%85-%D1%87%D0%BB%D0%B5%D0%BD%D1%96%D0%B2-%D0%93%D0%9E-%D0%A3%D0%9D%D0%86%D0%A2-%D0%BD%D0%B0-28.11.2020.pdf">
                <ListAltIcon
                  style={{ width: 20, verticalAlign: 'middle', color: 'black' }}
                />{' '}
                Список дійсних членів ГО “УНІТ” на 28.11.2020
              </a>
            </Box>
          </Frame>
        </Grid>
        <Grid item md={4}>
          <Box m={3}>
            <Text variant="h5" fontWeight={500}>
              Основнимi напрямки діяльності
            </Text>
            <List>
              {jobsList.map((item) => (
                <>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.job} />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}
