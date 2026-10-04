import {register} from './argocd/register';
import {CatalogAction} from './app/CatalogAction';
import {Extension} from './app/Extension';
register(CatalogAction, Extension);
