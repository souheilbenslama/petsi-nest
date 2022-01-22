import { Pet, PetDocument } from './pet.schema';
import { Model } from 'mongoose';
import { Generic } from './generic.service';


class PetService extends Generic<PetDocument> {
  constructor(
    readonly logger: LoggerService,
    @InjectModel(User.name) readonly usersModel: Model<User>
  ) {
    super(logger, usersModel);
  }
} 