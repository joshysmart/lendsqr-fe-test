//font
import { ReactElement } from "react";

import styles from '../styles/Layout.module.css'


type Props = {
  children: ReactElement | ReactElement[]
}

const Layout = ({ children }: Props): ReactElement => {
  return (
    <>
      <main className={styles.main}>
        {children}
      </main>
    </>
  )
}

export default Layout
