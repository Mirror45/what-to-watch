'use client';

interface TextInputProps {
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  pattern?: string;
  title?: string;
}

export default function TextInput({
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  pattern,
  title,
}: TextInputProps) {
  return (
    <div className="sign-in__field">
      <input
        className="sign-in__input"
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        pattern={pattern}
        title={title}
      />
      <label className="sign-in__label visually-hidden" htmlFor={id}>
        {placeholder}
      </label>
    </div>
  );
}
