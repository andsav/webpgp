const pages = [
    {
        name: "Generate",
        form: (
            <Form submit="Generate Key Pair">
                <Column name="Required Information">
                    <Input name="Name" type="text" placeholder="Full name" />
                    <Input name="Email" type="email" placeholder="Email address" />
                </Column>
                <Column name="Advanced Options">
                    <Input name="Passphrase" type="password" placeholder="RECOMMENDED" />
                    <Input name="Comment" type="text" />
                </Column>
            </Form>
        )
    },
    {
        name: "Encrypt",
        form: (
            <Form submit="Encrypt">
                <Column name="Message">
                    <Textarea name="Message" placeholder="Message" />
                </Column>
                <Column name="Public Key">
                    <Textarea name="Pub" placeholder="PGP Public Key" />
                </Column>
            </Form>
        )
    },
    {
        name: "Decrypt",
        form: (
            <Form submit="Decrypt">
                <Column name="Encrypted Message">
                    <Textarea name="Enc" placeholder="Encrypted Message" />
                </Column>
                <Column name="Private Key">
                    <Textarea name="Sec" placeholder="PGP Private Key" />
                </Column>
            </Form>
        )
    }
];
