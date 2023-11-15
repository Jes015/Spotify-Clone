import styles from './slider.module.css'

interface SliderProps extends React.HTMLProps<HTMLInputElement> {
}

export const Slider: React.FC<SliderProps> = ({ defaultValue, onChange, step, min, max, ...props }) => {
  return (
        <input
            className={styles.slider}
            min={min}
            type="range"
            defaultValue={defaultValue}
            onChange={onChange}
            max={max}
            step={step}
            {...props}
        />
  )
}

export default Slider