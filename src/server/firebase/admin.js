import * as admin from 'firebase-admin'
import serviceAccount from './secret'


export const firebase=admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://budget-management-ui.firebaseio.com"
})
