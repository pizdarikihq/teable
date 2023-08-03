/* eslint-disable jsx-a11y/no-static-element-interactions */
import { noop } from 'lodash';
import type { ForwardRefRenderFunction } from 'react';
import { useImperativeHandle, forwardRef, useRef, useState } from 'react';
import { Key as KeyCode } from 'ts-keycode-enum';
import type { IBooleanCell } from '../../renderers';
import type { IEditorRef, IEditorProps } from './EditorContainer';

const BooleanEditorBase: ForwardRefRenderFunction<
  IEditorRef<IBooleanCell>,
  IEditorProps<IBooleanCell>
> = (props, ref) => {
  const { cell, onChange } = props;
  const focusRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(cell.data);

  useImperativeHandle(ref, () => ({
    focus: () => focusRef.current?.focus(),
    setValue: (v: boolean) => setValue(v),
    saveValue: noop,
  }));

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.metaKey) return;
    if (e.keyCode === KeyCode.Enter) {
      const newValue = !value;
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div onKeyDown={onKeyDown} className="w-0 h-0">
      <input ref={focusRef} className="w-0 h-0 p-0 outline-none border-none shadow-none" />
    </div>
  );
};

export const BooleanEditor = forwardRef(BooleanEditorBase);