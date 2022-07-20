import React, {useEffect, useState} from 'react';
import uuid from 'react-native-uuid';

import {AnimatedText} from './AnimatedText';
import {ToastType} from './types';
import {AbsolutePositioning} from '../../styles/commonstyles';

export interface ToastData {
  title: string;
  label?: string;
  type: ToastType;
}

interface Props {
  toastData?: ToastData | undefined;
  delay?: number;
  clearToastData: () => void;
}

interface LabelProps extends ToastData {
  id: string;
}

export function Toast({toastData, delay, clearToastData}: Props) {
  const [labels, setLabels] = useState<LabelProps[]>([]);

  useEffect(() => {
    if (!toastData?.type || !toastData?.title) {
      return;
    }

    const labelsList = [...labels, toastData].map(element => {
      return {
        id: String(uuid.v4()),
        ...element,
      };
    });

    setLabels(labelsList);
    // eslint disabled because should run only when toastData changes and to avoid looping
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastData]);

  function handleHideToast(toastId: string) {
    setLabels(labelsState =>
      labelsState.filter(currentLabel => currentLabel.id !== toastId),
    );

    clearToastData();
  }

  return (
    <AbsolutePositioning>
      {labels
        .map(({id, title, label, type}) => (
          <AnimatedText
            id={id}
            key={id}
            type={type}
            title={title}
            label={label}
            onHide={handleHideToast}
            delay={delay}
          />
        ))
        .reverse()}
    </AbsolutePositioning>
  );
}
