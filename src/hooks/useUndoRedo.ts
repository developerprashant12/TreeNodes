import { useState } from 'react';

const useUndoRedo = (initialState: any) => {
  const [history, setHistory] = useState<any[]>([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const saveWorkflow = (newState: any) => {
    const updatedHistory = history.slice(0, currentIndex + 1);
    setHistory([...updatedHistory, newState]);
    setCurrentIndex(updatedHistory.length);
  };

  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const currentState = history[currentIndex];

  return [currentState, saveWorkflow, undo, redo];
};

export default useUndoRedo;
