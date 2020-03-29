import { ErrorInterceptor } from './error-interceptor';
import { AuthenticationService } from '../service/authentication.service';

describe('ErrorInterceptor', () => {

  let mockAuthService: jasmine.SpyObj<AuthenticationService>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthenticationService', ['']);
  });

  it('should create an instance', () => {
    expect(new ErrorInterceptor(mockAuthService)).toBeTruthy();
  });
});
