import "./css/spinner.css";

export interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className = "" }: SpinnerProps): JSX.Element => {
  return (
    <div className={`spinner-container ${className}`.trim()}>
      <div className="spinner" aria-label="Loading..." />
    </div>
  );
};

export default Spinner;
