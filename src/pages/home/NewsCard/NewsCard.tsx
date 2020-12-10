import React, { FC } from 'react'
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grid
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

import { Text, PriceBadge, Link } from '~/components/shared'

import useStyle from './NewsCardStyle'

interface NewsCardProps {
  title: string
  id: number
  loading?: boolean
}

const CarCard: FC<NewsCardProps> = ({ title, id, loading }): JSX.Element => {
  const classes = useStyle()

  return (
    <Grid item xs={12} spacing={2}>
      <Link to={`/article/${id}`} underline="none">
        <Card className={classes.root}>
          <CardContent style={{ height: '100%' }}>
            <Text gutterBottom className={classes.brand} variant="h6">
              {loading ? <Skeleton /> : `${title}`}
            </Text>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  )
}

export default CarCard
