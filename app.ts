const main = document.getElementById("main") as HTMLElement;

const ROUNDING_DECIMAL_PLACES = 8;
const ROUNDING_FACTOR = 10 ** ROUNDING_DECIMAL_PLACES;

function error(msg: string) {
  while (main.childElementCount > 0) {
    (main.lastChild as HTMLElement).remove();
  }
  const errorMessage = document.createElement("span");
  errorMessage.classList.add("error");
  main.appendChild(errorMessage);
}

type geolocationPropertyType = "latitude" | "longitude" | "altitude";

function setValue(
  property: geolocationPropertyType,
  coords: GeolocationCoordinates
) {
  const element = document.getElementById(property) as HTMLElement;
  element.textContent = (
    Math.round((coords[property] as number) * ROUNDING_FACTOR) / ROUNDING_FACTOR
  ).toString();
}

function success({ coords }: GeolocationPosition) {
  const properties: Array<geolocationPropertyType> = [
    "latitude",
    "longitude",
    "altitude",
  ];
  properties.forEach((prop) => setValue(prop, coords));
}

function start() {
  !navigator.geolocation &&
    error(
      "O teu browser não permite geolocalização por favor use um browser de jeito"
    );
  navigator.geolocation.watchPosition(success, () =>
    error(
      "Houve um erro a tentar fazer a geolocalização... Lamentamos o incómodo!"
    )
  );
}

start();
