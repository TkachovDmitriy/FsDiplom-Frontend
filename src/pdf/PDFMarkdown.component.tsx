import React from 'react'
import moment from 'moment'
import { Document, Page, View, Text, Image } from '@react-pdf/renderer'

import styles from './PDFMarkdown.style'

import header from '~/assets/images/PDF/headerCoupon.png'
import footer from '~/assets/images/PDF/footer.png'
import car from '~/assets/images/PDF/car.png'

interface PdfProps {
  brand: string
  model: string
  orderable_name: string
  price: number
  date: string
  time: string
  loading: boolean
}

const PDFMarkdown = ({
  brand,
  model,
  time,
  orderable_name,
  price,
  date,
  loading
}: PdfProps): JSX.Element => {
  return (
    <Document>
      <Page style={styles.page}>
        {!loading && (
          <>
            <View style={styles.header}>
              <Image style={styles.logo} src={header} />
            </View>
            <View style={styles.body}>
              <View style={styles.testDriveBlock}>
                <View style={styles.testDrive}>
                  <View style={styles.car}>
                    <Image style={styles.carImg} src={car} />
                  </View>
                  <Text style={styles.testDriveText}>
                    <Text style={styles.testDriveTextStatic}>
                      {' '}
                      Test drive date:{' '}
                    </Text>{' '}
                    <Text style={styles.testDriveTextDinamic}>{date}</Text>
                  </Text>
                </View>
                <View>
                  <View style={styles.table}>
                    <Text style={styles.infoText}>
                      Hello, thanks for purchasing a test drive on TestMee, we
                      look forward to seeing you!
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.table}>
                <Text style={styles.tableRow}>
                  <Text style={styles.tableRowTextStatic}> Name:</Text>{' '}
                  <Text style={styles.tableRowTextDinamic}>
                    {orderable_name}
                  </Text>
                </Text>
                <Text style={styles.tableRow}>
                  <Text style={styles.tableRowTextStatic}> Brand:</Text>{' '}
                  <Text style={styles.tableRowTextDinamic}>{brand}</Text>
                </Text>
                <Text style={styles.tableRow}>
                  <Text style={styles.tableRowTextStatic}> Model:</Text>{' '}
                  <Text style={styles.tableRowTextDinamic}>{model}</Text>
                </Text>
                <Text style={styles.tableRow}>
                  <Text style={styles.tableRowTextStatic}> Price:</Text>{' '}
                  <Text style={styles.tableRowTextDinamic}>
                    {price} € (incl. VAT)
                  </Text>
                </Text>
                <Text style={styles.tableRow}>
                  <Text style={styles.tableRowTextStatic}>Time:</Text>{' '}
                  <Text style={styles.tableRowTextDinamic}>
                    {moment(time).utc().format('HH:mm')}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.footer}>
              <Image style={styles.logoFooter} src={footer} />
            </View>
          </>
        )}
      </Page>
    </Document>
  )
}
export default PDFMarkdown
