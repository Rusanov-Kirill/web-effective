import styles from './modules/Loading.module.css'

const Loading: React.FC = () => {
    return (
        <div className={styles['loading-container']}>
            <div className={styles['loading-text']}>Loading...</div>
          </div>
    )
}

export default Loading;