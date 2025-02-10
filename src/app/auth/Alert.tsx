const Alert = ({ message }: { message: string }) => {
    return (
      <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
        {message}
      </div>
    );
  };
  
  export { Alert };
  