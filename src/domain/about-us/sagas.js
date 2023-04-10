import Api from 'domain/api';
import {
  getAboutUsAction,
} from 'domain/about-us/actions';
import ensure from 'libs/ensureSaga';
import I from 'immutable';


export const ensureGetAboutPage = ensure({
  api: Api.getAboutPage,
  action: getAboutUsAction,
  responseSerializer: d => I.fromJS(d),
});
