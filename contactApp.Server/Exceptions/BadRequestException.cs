namespace contactApp.Server.Exceptions
{
    public class BadRequestException : Exception
    {
        public BadRequestException(string msg) : base(msg) 
        {
            
        }
    }
}
