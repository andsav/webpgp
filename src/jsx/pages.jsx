const pages = [
    {
        name: "Generate",
        form: (
            <Form submit="Generate Key Pair">
                <Row>
                    <Column>
                        <Input name="Name" type="text" placeholder="Full name" />
                        <Input name="Email" type="email" placeholder="Email address" />
                    </Column>
                    <Column>
                        <Input name="Passphrase" type="password" placeholder="RECOMMENDED" />
                        <Input name="Comment" type="text" />
                    </Column>
                </Row>
            </Form>
        )
    },
    {
        name: "Encrypt",
        form: (
            <Form submit="Encrypt">
                <Row>
                    <Column>
                        <Textarea name="Message" placeholder="Message" />
                    </Column>
                    <Column>
                        <Textarea name="Public Key" placeholder="PGP Public Key" />
                    </Column>
                </Row>
            </Form>
        )
    },
    {
        name: "Decrypt",
        form: (
            <Form submit="Decrypt">
                <Row>
                    <Column>
                        <Textarea name="Encrypted Message" placeholder="Encrypted Message" />
                    </Column>
                    <Column name="Private Key">
                        <Textarea name="Private Key" placeholder="PGP Private Key" />
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <Input name="Passphrase" type="password" />
                    </Column>
                </Row>
            </Form>
        )
    }
];
