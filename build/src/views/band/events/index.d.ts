import Domain from '../../../models/domain';
import Animatable from '../../animatable';
export default class Events extends Animatable {
    private domain;
    private eventSegments;
    constructor(domain: Domain);
    render(): any;
    update: () => void;
}
