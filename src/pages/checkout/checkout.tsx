import "./checkout.css";

import {
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import CheckoutPopup from "../../components/checkoutPopup/checkoutPopup";
import { Link } from "react-router";
import OrderSummary from "../../components/orderSummary/orderSummary";
import { useCart } from "../../contexts/cartContext";

type FormValues = {
  name: string;
  email: string;
  street: string;
  city: string;
  zip: string;
  shipping: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  street: "",
  city: "",
  zip: "",
  shipping: "standard",
  cardNumber: "",
  expiryDate: "",
  cvv: "",
};

const initialTouched: Record<keyof FormValues, boolean> = {
  name: false,
  email: false,
  street: false,
  city: false,
  zip: false,
  shipping: false,
  cardNumber: false,
  expiryDate: false,
  cvv: false,
};

/* ---------- форматирование ввода ---------- */

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiryDate(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

const digitsOnly = (value: string) => value.replace(/\D/g, "");

/* ---------- проверки ---------- */

function luhnCheck(digits: string): boolean {
  let sum = 0;
  let doubleDigit = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number(digits[i]);
    if (doubleDigit) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    doubleDigit = !doubleDigit;
  }

  return sum % 10 === 0;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Введите полное имя";
  } else if (values.name.trim().length < 2) {
    errors.name = "Имя слишком короткое";
  }

  if (!values.email.trim()) {
    errors.email = "Введите email";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Некорректный email";
  }

  if (!values.street.trim()) {
    errors.street = "Введите улицу";
  }

  if (!values.city.trim()) {
    errors.city = "Введите город";
  }

  if (!/^\d{6}$/.test(values.zip)) {
    errors.zip = "Индекс должен содержать 6 цифр";
  }

  if (!values.shipping) {
    errors.shipping = "Выберите способ доставки";
  }

  const cardDigits = values.cardNumber.replace(/\D/g, "");
  if (!cardDigits) {
    errors.cardNumber = "Введите номер карты";
  } else if (cardDigits.length !== 16) {
    errors.cardNumber = "Номер карты должен содержать 16 цифр";
  } else if (!luhnCheck(cardDigits)) {
    errors.cardNumber = "Некорректный номер карты";
  }

  const expiryMatch = values.expiryDate.match(/^(\d{2})\/(\d{2})$/);
  if (!expiryMatch) {
    errors.expiryDate = "Формат ММ/ГГ";
  } else {
    const month = Number(expiryMatch[1]);
    const year = Number(expiryMatch[2]);
    if (month < 1 || month > 12) {
      errors.expiryDate = "Некорректный месяц";
    } else {
      // карта действительна до конца указанного месяца
      const expires = new Date(2000 + year, month, 1);
      if (expires <= new Date()) {
        errors.expiryDate = "Срок действия истёк";
      }
    }
  }

  if (!/^\d{3,4}$/.test(values.cvv)) {
    errors.cvv = "CVV должен содержать 3–4 цифры";
  }

  return errors;
}

/* ---------- вспомогательные компоненты ---------- */

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className={`field${error ? " field--error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

type TextInputProps = {
  id: keyof FormValues;
  label: string;
  value: string;
  error?: string;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "numeric" | "email" | "tel";
  autoComplete?: string;
  maxLength?: number;
  onChange: (value: string) => void;
  onBlur: () => void;
};

function TextInput({
  id,
  label,
  value,
  error,
  placeholder,
  type = "text",
  inputMode,
  autoComplete,
  maxLength,
  onChange,
  onBlur,
}: TextInputProps) {
  return (
    <Field id={id} label={label} error={error}>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
    </Field>
  );
}

/* ---------- страница оплаты ---------- */

export default function Checkout() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [touched, setTouched] =
    useState<Record<keyof FormValues, boolean>>(initialTouched);
  const [submitted, setSubmitted] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { clearCart } = useCart();

  const errors = validate(values);

  const showError = (field: keyof FormValues): string | undefined =>
    touched[field] || submitted ? errors[field] : undefined;

  const formatters: Partial<
    Record<keyof FormValues, (value: string) => string>
  > = {
    cardNumber: formatCardNumber,
    expiryDate: formatExpiryDate,
    cvv: (value) => digitsOnly(value).slice(0, 4),
    zip: (value) => digitsOnly(value).slice(0, 6),
  };

  const setField = (field: keyof FormValues, raw: string) => {
    const value = formatters[field]?.(raw) ?? raw;
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof FormValues) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setTouched({
      name: true,
      email: true,
      street: true,
      city: true,
      zip: true,
      shipping: true,
      cardNumber: true,
      expiryDate: true,
      cvv: true,
    });

    if (Object.values(errors).some(Boolean)) return;

    clearCart();
    setOrderPlaced(true);
  };

  const hasErrors = submitted && Object.values(errors).some(Boolean);

  return (
    <div className="checkout">
      <div className="layout header">
        <Link className="back-to-shop align-left" to="/">
          &larr; Назад за покупками
        </Link>
        <h1 className="shop-name align-center">Здесь будут черви</h1>
        <p className="safe-payment align-right">🔐 Безопасная оплата</p>
      </div>

      <div className="progress-stripe layout">
        <span>выбор</span>
        <i>&rarr;</i>
        <span style={{ color: "var(--primary)" }}>оплата</span>
        <i>&rarr;</i>
        <span>заказ подтвержден</span>
      </div>

      <form className="layout form-layout" onSubmit={handleSubmit} noValidate>
        <div className="form-inputs">
          <div className="form-block card-padding bordered">
            <h3>👤 Контактная информация</h3>
            <TextInput
              id="name"
              label="Полное имя"
              value={values.name}
              error={showError("name")}
              placeholder="Иван Охлобыстин"
              autoComplete="name"
              onChange={(value) => setField("name", value)}
              onBlur={handleBlur("name")}
            />
            <TextInput
              id="email"
              label="Email"
              type="email"
              inputMode="email"
              value={values.email}
              error={showError("email")}
              placeholder="ivan.ohlobystin@example.com"
              autoComplete="email"
              onChange={(value) => setField("email", value)}
              onBlur={handleBlur("email")}
            />
          </div>

          <div className="form-block card-padding bordered">
            <h3>📍 Адрес доставки</h3>
            <TextInput
              id="street"
              label="Улица"
              value={values.street}
              error={showError("street")}
              placeholder="Пушкина"
              autoComplete="address-line1"
              onChange={(value) => setField("street", value)}
              onBlur={handleBlur("street")}
            />
            <TextInput
              id="city"
              label="Город"
              value={values.city}
              error={showError("city")}
              placeholder="Пушкин"
              autoComplete="address-level2"
              onChange={(value) => setField("city", value)}
              onBlur={handleBlur("city")}
            />
            <TextInput
              id="zip"
              label="Почтовый индекс"
              inputMode="numeric"
              value={values.zip}
              error={showError("zip")}
              placeholder="666666"
              autoComplete="postal-code"
              maxLength={6}
              onChange={(value) => setField("zip", value)}
              onBlur={handleBlur("zip")}
            />
          </div>

          <div className="form-block card-padding bordered">
            <h3>📬 Способ доставки</h3>
            <Field id="shipping" label="Способ доставки" error={showError("shipping")}>
              <div className="radio-row">
                <label className="radio-label">
                  <input
                    type="radio"
                    id="shipping"
                    name="shipping"
                    value="standard"
                    checked={values.shipping === "standard"}
                    onChange={(event) => setField("shipping", event.target.value)}
                  />
                  Стандартная доставка (3–5 дней)
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    id="shipping-express"
                    name="shipping"
                    value="express"
                    checked={values.shipping === "express"}
                    onChange={(event) => setField("shipping", event.target.value)}
                  />
                  Экспресс доставка (1–2 дня)
                </label>
              </div>
            </Field>
          </div>

          <div className="form-block card-padding bordered payment-card">
            <h3>💳 Платежная информация</h3>
            <TextInput
              id="cardNumber"
              label="Номер карты"
              inputMode="numeric"
              value={values.cardNumber}
              error={showError("cardNumber")}
              placeholder="1234 5678 9012 3456"
              autoComplete="cc-number"
              maxLength={19}
              onChange={(value) => setField("cardNumber", value)}
              onBlur={handleBlur("cardNumber")}
            />
            <div className="card-row">
              <TextInput
                id="expiryDate"
                label="Срок действия"
                inputMode="numeric"
                value={values.expiryDate}
                error={showError("expiryDate")}
                placeholder="ММ/ГГ"
                autoComplete="cc-exp"
                maxLength={5}
                onChange={(value) => setField("expiryDate", value)}
                onBlur={handleBlur("expiryDate")}
              />
              <TextInput
                id="cvv"
                label="CVV"
                inputMode="numeric"
                value={values.cvv}
                error={showError("cvv")}
                placeholder="123"
                autoComplete="cc-csc"
                maxLength={4}
                onChange={(value) => setField("cvv", value)}
                onBlur={handleBlur("cvv")}
              />
            </div>
          </div>
        </div>

        <div className="order">
          <OrderSummary />
          {hasErrors && (
            <p className="form-error-summary">
              Пожалуйста, исправьте ошибки в форме
            </p>
          )}
          <button className="button bordered" type="submit">
            🤑 Подтвердить заказ
          </button>
        </div>
      </form>

      <CheckoutPopup isOpen={orderPlaced} onClose={() => setOrderPlaced(false)} />
    </div>
  );
}
