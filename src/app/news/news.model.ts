export class News {
  public title: string;
  public description: string;
  public imagePath: string;
  public linkToNews: string;
  public Date: string;

  constructor(
    title: string,
    desc: string,
    imagePath: string,
    linkToNews: string,
    Date: string
  ) {
    this.title = title;
    this.description = desc;
    this.imagePath = imagePath;
    this.linkToNews = linkToNews;
    this.Date = Date;
  }
}
