export class Theaters {
  public id: String;
  public name: string;
  public address: string;
  public phone: string;
  public lat: string;
  public alt: string;

  constructor(
    id: string,
    name: string,
    address: string,
    phone: string,
    lat: string,
    alt: string
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.lat = lat;
    this.alt = alt;
  }
}
