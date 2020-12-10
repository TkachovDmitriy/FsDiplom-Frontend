import React, { FC } from 'react'
import Slider from 'react-slick'
import { Box, Fab } from '@material-ui/core'
import cx from 'classnames'

import { ReactComponent as LeftArrow } from '~/assets/icons/leftArrow.svg'
import { ReactComponent as RightArrow } from '~/assets/icons/rightArrow.svg'

import { useStyle } from './SlickSlider.style'
import { Skeleton } from '@material-ui/lab'

const SampleNextArrow = (props) => {
  return (
    <Fab color="primary" variant="contained" {...props}>
      <RightArrow height={12} />
    </Fab>
  )
}

const SamplePrevArrow = (props) => {
  return (
    <Fab color="primary" variant="contained" {...props}>
      <LeftArrow height={12} />
    </Fab>
  )
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}

type Props = {
  className?: string
  photos?: any[]
  loading?: boolean
}

const placholder = new Array(3).fill(null)

const SlickSlider: FC<Props> = ({ className, photos = [], loading }) => {
  const classes = useStyle()

  return (
    <>
      <Slider
        {...settings}
        className={cx(classes.root, { [className]: !!className })}
      >
        {(loading ? placholder : photos)?.map((img) => (
          <Box display="flex" height="100%" key={img}>
            {img ? (
              <img className={classes.imageFit} src={img} />
            ) : (
              <Skeleton
                height="100%"
                width="100%"
                style={{ transform: 'inherit' }}
              />
            )}
          </Box>
        ))}
      </Slider>
    </>
  )
}

export default SlickSlider
