export class Theaters {
  public name: string;
  public address: string;
  public phone: string;
  public lat: string;
  public alt: string;

  constructor(
    name: string,
    address: string,
    phone: string,
    lat: string,
    alt: string
  ) {
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.lat = lat;
    this.alt = alt;
  }
}
