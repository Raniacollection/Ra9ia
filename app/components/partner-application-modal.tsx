"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// Business contact info
const BUSINESS_WHATSAPP = "1234567890"; // Replace with your actual WhatsApp number
const BUSINESS_TELEGRAM = "onlll4"; // Telegram username

interface PartnerApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  website: string;
  productType: string;
  partnershipModel: string;
  description: string;
}

interface PartnerApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationData: PartnerApplicationData;
}

export function PartnerApplicationModal({ isOpen, onClose, applicationData }: PartnerApplicationModalProps) {
  const [contactMethod, setContactMethod] = React.useState("");

  React.useEffect(() => {
    if (!isOpen) {
      setContactMethod("");
    }
  }, [isOpen]);

  if (!isOpen || !applicationData) return null;

  const handleSubmit = () => {
    if (!contactMethod) {
      alert("Please select your preferred contact method.");
      return;
    }

    // Format the application data in a more professional, document-like format
    const message = `
*PARTNER APPLICATION - RA9IA COLLECTION*

*APPLICANT INFORMATION*
Name: ${applicationData.firstName} ${applicationData.lastName}
Email: ${applicationData.email}
Company/Brand: ${applicationData.company}
Website/Social: ${applicationData.website}

*BUSINESS DETAILS*
Product Type: ${applicationData.productType}
Partnership Model: ${applicationData.partnershipModel}

*PRODUCT DESCRIPTION*
${applicationData.description}

*NEXT STEPS*
Our team will review your application and reach out to discuss partnership opportunities. Thank you for your interest in partnering with Ra9ia Collection.

Application Reference: APP-${Date.now().toString().substring(6)}
    `.trim();

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Redirect based on preferred contact method
    if (contactMethod === "whatsapp") {
      window.open(`https://wa.me/${BUSINESS_WHATSAPP}?text=${encodedMessage}`, "_blank");
    } else if (contactMethod === "telegram") {
      window.open(`https://t.me/${BUSINESS_TELEGRAM}?text=${encodedMessage}`, "_blank");
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Complete Your Partner Application</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <p className="text-center">
              Your application is ready to submit. Please select how you'd like to contact us:
            </p>
          </div>
          
          <div className="grid gap-4 border p-4 rounded-md bg-muted/50">
            <div className="space-y-1">
              <h3 className="font-medium">Application Summary</h3>
              <p className="text-sm text-muted-foreground">
                {applicationData.firstName} {applicationData.lastName} • {applicationData.company}
              </p>
              <p className="text-sm text-muted-foreground">
                Product Type: {applicationData.productType} • Model: {applicationData.partnershipModel}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4 pt-4">
            <Label htmlFor="contact-method" className="text-right">
              Contact Via
            </Label>
            <Select value={contactMethod} onValueChange={setContactMethod}>
              <SelectTrigger className="col-span-3 h-9">
                <SelectValue placeholder="Select messaging app" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="telegram">Telegram</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="text-sm text-muted-foreground pt-2">
            <p>
              By selecting a contact method, your application will be forwarded directly to our partner relationship team via your chosen platform.
            </p>
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit} className="bg-ra9ia-800 hover:bg-ra9ia-900">
            Continue to {contactMethod ? (contactMethod === "whatsapp" ? "WhatsApp" : "Telegram") : "Messaging"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 