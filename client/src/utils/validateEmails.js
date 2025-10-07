// eslint-disable-next-line import/no-anonymous-default-export
export default emails => {
   const invalidEmails = emails
      .split(',')
      .map(email => email.trim())
      .filter(
         email =>
            email.length &&
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
      );
};
