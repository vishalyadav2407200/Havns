import '@styles/loading.css';

const Loading = (color,size) => {
  return (
    <div className="flex justify-center" style={{width:{size}}}>
      <span className={`loader border-${color}-500`}></span>
    </div>
  );
}

export default Loading
