import { StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E5E5E5'
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  car: {
    backgroundColor: '#fff',
    width: '70px',
    borderRadius: 4,
    marginRight: 10
  },
  carImg: {
    padding: 10,
    width: '70px'
  },
  testDrive: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',

    backgroundColor: '#64696C',
    borderRadius: 4
  },
  testDriveText: {
    color: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center'
  },
  testDriveTextStatic: {
    color: '#fff',
    fontSize: 14
  },
  testDriveTextDinamic: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 700
  },
  header: {
    top: 0,
    left: 0,
    backgroundColor: '#2B2929'
  },
  logo: {
    left: '37%',
    padding: '25px',
    margin: '0 auto',
    width: '160px'
  },
  logoFooter: {
    padding: '25px',
    margin: '0 auto',
    width: '120px'
  },
  infoText: {
    padding: '25px',
    fontSize: 16,
    lineHeight: '24px'
  },
  table: {
    marginTop: 35,
    // padding: '10px',
    backgroundColor: '#fff',
    borderRadius: 4,
    border: 1,
    borderColor: '#BBC0C4',
    borderBottom: 0
  },
  tableRow: {
    padding: '15px',
    borderBottom: 1,
    borderColor: '#BBC0C4',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center'
  },
  tableRowTextStatic: {
    color: '#787F84',
    fontSize: 18
  },
  tableRowTextDinamic: {
    color: '#1E1E1E',
    fontSize: 18,
    fontWeight: 700
  },

  footer: {
    backgroundColor: '#2B2929',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
})

export default styles
