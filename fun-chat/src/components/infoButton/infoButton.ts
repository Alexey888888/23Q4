import RouterInterface, { Paths } from '../../types/types';
import Button from '../button/button';

export default class InfoButton extends Button {
  router: RouterInterface;

  constructor(router: RouterInterface) {
    super({ text: 'Info', onClick: (event) => this.infoButtonHandler(event) });
    this.router = router;
  }

  public infoButtonHandler(event: Event) {
    event.preventDefault();
    this.router.routeTo(Paths.about);
  }
}
