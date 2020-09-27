import React, { useState, useCallback } from "react";
import {
  Layout,
  Page,
  Card,
  Button,
  FormLayout,
  Checkbox,
} from "@shopify/polaris";

export default function Cresentials() {
  return (
    <Page title="Logs">
      <Layout>
        <Layout.AnnotatedSection title="Sync">
          <Card sectioned>
            <FormLayout>
              {/* <FormLayout.Group> */}

              <Checkbox
                value={true}
                checked={true}
                label="Sync Price Also"
                placeholder=""
                onChange={() => {}}
              />
              <Button primary>Full Sync</Button>
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}
