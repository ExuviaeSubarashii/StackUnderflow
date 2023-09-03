namespace SU.Service
{
    public static class HexSplitter
    {
        public static byte[] HexSplit(string Password)
        {
            string[] hexValues = Password.Split('-');

            // Create a byte array to store the converted values
            byte[] byteArray = new byte[hexValues.Length];

            for (int i = 0; i < hexValues.Length; i++)
            {
                // Parse each hexadecimal value and store it in the byte array
                byteArray[i] = Convert.ToByte(hexValues[i], 16);
            }
            return byteArray;
        }
    }
}
