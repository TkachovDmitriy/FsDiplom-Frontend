import { RouteProps } from 'react-router'
import { DecoratedComponentClass } from 'redux-form'
import jwtDecode from 'jwt-decode'

// layouts
import AppLayout from '~/components/layouts/AppLayout'

// pages
import Index from '~/pages/home'
import SignIn from '~/pages/sign-in'
import Dashboard from '~/pages/dashboard'
// import SignInDealer from '~/pages/sign-in/dealer'
import SignUp from '~/pages/sign-up'
// import SignUpDealer from '~/pages/sign-up/dealer'
// import ForgotPassword from '~/pages/forgot-password'
// import Verify from '~/pages/verify'
// import ResetPassword from '~/pages/reset-password'
// import Dealer from './pages/dealer'
// import {
//   ConfirmationEmail,
//   ConfirmationPassword
// } from '~/components/confirmation'
import { ROLES } from './constants/roles'
// import Profile from '~/pages/profile'
import AllNews from '~/pages/all-cars'
import Article from './pages/article'
// import aboutUs from './pages/about-us'
// import Imprint from './pages/imprint'
// import PrivacyPolicy from './pages/privacy-policy'
// import TermsOfService from './pages/terms-of-service/termsOfService.component'
// import FAQ from './pages/faq/faq.component'
// import ContactInfo from './pages/contact-info/contactInfo.component'
import ErrorPage from './pages/404-page'
// import Congratulation from './pages/congratulation-page/Congratulation.component'
// import Payment from './pages/payment-page'
import { STORAGE } from './constants'
import GoverningBodies from './pages/governing-bodies'
import MembershipProcedure from './pages/membership-procedure/MembershipProcedure'
import Regulations from './pages/regulations/Regulations'
// import ViewAllCars from './pages/home/ViewAllCars'

export type RouterRoute = {
  path: string
  component: React.FunctionComponent<any> | DecoratedComponentClass<any, any>
  layout: React.FunctionComponent
  exact?: boolean
  meta?: {
    [key: string]: any
  }
  access?: string[]
  redirect?: string
}

const routes: RouterRoute[] = [
  {
    path: '/',
    exact: true,
    component: Index,
    layout: AppLayout
  },
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
    layout: AppLayout,
    redirect: '/dashboard/listing'
    // access: [ROLES.dealer]
  },
  {
    path: '/governing-bodies',
    exact: true,
    component: GoverningBodies,
    layout: AppLayout
  },
  {
    path: '/membership-procedure',
    exact: true,
    component: MembershipProcedure,
    layout: AppLayout
  },
  {
    path: '/regulations',
    exact: true,
    component: Regulations,
    layout: AppLayout
  },
  {
    path: '/news',
    exact: true,
    component: AllNews,
    layout: AppLayout
  },
  {
    path: '/article/:newsId',
    exact: true,
    component: Article,
    layout: AppLayout
  },

  {
    path: '/dashboard/:tab',
    exact: true,
    component: Dashboard,
    layout: AppLayout
    // access: [ROLES.dealer]
  },
  // {
  //   path: '/dashboard/edit/:carEditId',
  //   exact: true,
  //   component: Dashboard,
  //   layout: AppLayout,
  //   access: [ROLES.dealer]
  // },
  {
    path: '/sign-in',
    exact: true,
    component: SignIn,
    layout: AppLayout,
    access: [ROLES.guest, ROLES.dealer]
  },
  {
    path: '/sign-up',
    exact: true,
    component: SignUp,
    layout: AppLayout,
    access: [ROLES.guest, ROLES.dealer]
  },
  // {
  //   path: '/sign-in/dealer',
  //   exact: true,
  //   component: SignInDealer,
  //   layout: AppLayout,
  //   access: [ROLES.guest, ROLES.user]
  // },
  // {
  //   path: '/sign-up/dealer',
  //   exact: true,
  //   component: SignUpDealer,
  //   layout: AppLayout,
  //   access: [ROLES.guest, ROLES.user]
  // },
  // {
  //   path: '/confirmation/:role/:token',
  //   component: ConfirmationEmail,
  //   layout: AppLayout
  // },
  // {
  //   path: '/sign-up/verify',
  //   component: Verify,
  //   layout: AppLayout
  // },
  // {
  //   path: '/forgot-password',
  //   exact: true,
  //   component: ForgotPassword,
  //   layout: AppLayout,
  //   meta: {
  //     role: ROLES.user
  //   },
  //   access: [ROLES.guest, ROLES.dealer]
  // },
  // {
  //   path: '/forgot-password/dealer',
  //   component: ForgotPassword,
  //   layout: AppLayout,
  //   meta: {
  //     role: ROLES.dealer
  //   },
  //   access: [ROLES.guest, ROLES.user]
  // },
  // {
  //   path: '/forgot-password/verify',
  //   component: Verify,
  //   layout: AppLayout
  // },
  // {
  //   path: '/reset-password/:role',
  //   exact: true,
  //   component: ResetPassword,
  //   layout: AppLayout
  // },
  // {
  //   path: '/reset-password/:role/:token',
  //   component: ConfirmationPassword,
  //   layout: AppLayout
  // }
  // {
  //   path: '/profile',
  //   component: Profile,
  //   layout: AppLayout,
  //   access: [ROLES.user]
  // },
  // {
  //   path: '/dealer/:dealerId',
  //   component: Dealer,
  //   layout: AppLayout
  // },
  // {
  //   path: '/all-cars',
  //   exact: true,
  //   component: AllCars,
  //   layout: AppLayout
  // },
  // {
  //   path: '/all-cars/offer',
  //   exact: true,
  //   component: Offer,
  //   layout: AppLayout
  // },
  // {
  //   path: '/all-cars/:carId',
  //   exact: true,
  //   component: Offer,
  //   layout: AppLayout
  // },
  // {
  //   path: '/all-cars/:carId/payment',
  //   exact: false,
  //   component: Payment,
  //   layout: AppLayout,
  //   access: [ROLES.user]
  // },
  // {
  //   path: '/about-us',
  //   exact: false,
  //   component: aboutUs,
  //   layout: AppLayout
  // },
  // {
  //   path: '/imprint',
  //   exact: false,
  //   component: Imprint,
  //   layout: AppLayout
  // },
  // {
  //   path: '/privacy-policy',
  //   exact: false,
  //   component: PrivacyPolicy,
  //   layout: AppLayout
  // },
  // {
  //   path: '/terms-of-service',
  //   exact: false,
  //   component: TermsOfService,
  //   layout: AppLayout
  // },
  // {
  //   path: '/faq',
  //   exact: false,
  //   component: FAQ,
  //   layout: AppLayout
  // },
  // {
  //   path: '/contact-info',
  //   exact: false,
  //   component: ContactInfo,
  //   layout: AppLayout
  // },
  // {
  //   path: '/congratulation',
  //   exact: false,
  //   component: Congratulation,
  //   layout: AppLayout,
  //   access: [ROLES.dealer, ROLES.user]
  // },
  {
    path: '/',
    exact: false,
    component: ErrorPage,
    layout: AppLayout
  }
]

export const router = {
  routes: routes,
  beforeEnter: (to: RouterRoute & RouteProps): string => {
    let role: string = ROLES.guest
    let confirmed = false
    const token = localStorage.getItem(STORAGE.authToken)
    if (token) {
      const { role: _role, confirmed: _confirmed } = jwtDecode(token)
      role = _role
      confirmed = _confirmed
    }
    if (!confirmed && !!token) role = ROLES.guest
    if (!!token) {
      if (to.access) {
        if (!to.access?.includes(role)) {
          return '/'
        }
      }
    } else {
      if (to.access && !to.access.includes(role)) {
        return '/'
      }
    }

    return null
  }
}
