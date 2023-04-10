import Api from 'domain/api';
import {
  getTermsAction,
} from 'domain/terms/actions';
import ensure from 'libs/ensureSaga';
import I from 'immutable';


export const ensureGetTermsPage = ensure({
  api: Api.getTermsPage,
  action: getTermsAction,
  responseSerializer: d => I.fromJS(d),
});
