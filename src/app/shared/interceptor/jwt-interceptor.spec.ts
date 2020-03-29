import { JwtInterceptor } from './jwt-interceptor';
import { AuthenticationService } from '../service/authentication.service';

describe('JwtInterceptor', () => {
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthenticationService', ['']);
  });

  it('should create an instance', () => {
    expect(new JwtInterceptor(mockAuthService)).toBeTruthy();
  });
});
