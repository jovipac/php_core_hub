import { HttpHeaders } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";

export const getHeaders = () => {
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "authorization": `${JSON.parse(sessionStorage.getItem('validate')).token_type} ${JSON.parse(sessionStorage.getItem('validate')).access_token}`
    })
  };
}

export const extractErrorMessages = (errorResponse: HttpErrorResponse) => {
  // 1 - Create empty array to store errors
  const errors = [];

  // 2 - check if the error object is present in the response
  if (errorResponse.error) {

    // 3 - Push the main error message to the array of errors
    errors.push(errorResponse.error.message);

    // 4 - Check for Laravel form validation error messages object
    if (errorResponse.error.errors) {

      // 5 - For each error property (which is a form field)
      for (const property in errorResponse.error.errors) {

        if (errorResponse.error.errors.hasOwnProperty(property)) {

          // 6 - Extract it's array of errors
          const propertyErrors: Array<string> = errorResponse.error.errors[property];

          // 7 - Push all errors in the array to the errors array
          propertyErrors.forEach(error => errors.push(error));
        }

      }

    }

  }

  return errors;
};


/**
 * Formatear el correlativo del expediente
 * @param  {string}  auxiliatura  :codigo de la auxiliatura
 * @param  {string}  anio  : año en cuatro digitos
 * @param  {string}  folio  : numero de folio
 * @param  {string} sep  :separador que se utiliza por defecto se usa el guion
 * @return {string}
 */
export const formatearCorrelativo = (auxiliatura = null, anio: number, folio: number, sep = "-") => {
  return folio
    ? [
      auxiliatura ? String(auxiliatura).padStart(3, "0") : "",
      String(folio).padStart(5, "0"),
      anio
    ]
      .filter(Boolean)
      .join(sep)
    : "";
};

/**
 * Esto devolverá verdadero para los siguientes casos:
 * {}, [], "", indefinido, nulo, objeto en el fragmento anterior (sin propiedad enumerable)
 * @param  {any} value: Indica que valor se va evaluar
 * @return {Boolean}
 */
export function isEmptyValue(value: any) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0) ||
    (typeof value === "string" && value.trim() === "undefined") ||
    (typeof value === "number" && isNaN(value))
  );
}

/**
 * Función de formato de cadena creada para combinar valores variables intercaladas en la cadena original
 * @param {string} str la cadena de texto original que se utilizará
 * @param {Array} params listado de valores numericos o cadenas
 * @returns {string} cadena creada combinada con valores de variables dentro de la misma
 */
export const sprintf = (str, params) => {
  str = str.toString();
  if (params.length) {
    const t = typeof params[0];
    const args =
      "string" === t || "number" === t
        ? Array.prototype.slice.call(params)
        : params[0];

    for (const key in args) {
      str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
    }
  }

  return str;
};
