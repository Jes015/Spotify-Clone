import styles from './slider.module.css'

interface SliderProps extends React.HTMLProps<HTMLInputElement> {
}

export const Slider: React.FC<SliderProps> = (props) => {
    return (
        <input
            className={styles.slider}
            min={0}
            type="range"
            {...props}
        />
    )
}

export default Slider