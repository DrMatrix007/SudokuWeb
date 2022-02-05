import '../styles/globals.css'
import { initializeApp } from 'firebase/app'
import Navbar from '@components/NavbarComponent';
const firebaseConfig = {
  apiKey: "AIzaSyB_kQpCOdmvkb8krKPpt1JpRthGFXCi1aQ",
  authDomain: "sudoku-matrix.firebaseapp.com",
  projectId: "sudoku-matrix",
  storageBucket: "sudoku-matrix.appspot.com",
  messagingSenderId: "898536689645",
  appId: "1:898536689645:web:dae48deae301249bdfe1e4",
  measurementId: "G-H4VKT4VQGT"
};

function MyApp({ Component, pageProps }: any) {
  try {
    initializeApp(firebaseConfig);
  } catch (e) {

  }


  return (
    <div className='content-holder'>
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp;
