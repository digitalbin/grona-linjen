import '../styles/reset.css';
import '../styles/styles.scss'
import Nav from '../components/Nav';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <div className="site-wrapper">
      <Nav />
      <Component {...pageProps} />
    </div>
  )
}
