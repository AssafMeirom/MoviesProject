export class Movie {
  public id: String;
  public Title: string;
  public Year: string;
  public Runtime: number;
  public Genre: string;
  public Plot: string;
  public Metascore: string;
  public imdbRating: string;
  public imagePath: string;

  constructor(
    id: string,
    Title: string,
    Year: string,
    Runtime: number,
    Genre: string,
    Plot: string,
    Metascore: string,
    imdbRating: string,
    imagePath: string
  ) {
    this.id = id;
    this.Title = Title;
    this.Year = Year;
    this.Runtime = Runtime;
    this.Genre = Genre;
    this.Plot = Plot;
    this.Metascore = Metascore;
    this.imdbRating = imdbRating;
    this.imagePath = imagePath;
  }
}
