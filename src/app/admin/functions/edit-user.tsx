"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { client } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function EditUserDialog({ id, currentRole }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(currentRole);
  const [loading, setLoading] = useState(false);

  const updateRole = async () => {
    setLoading(true);
    try {
      await client.api.users[":id"].$patch({
        param: { id },
        form: { role },
      });
      toast.success("User role updated successfully");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating user role", error);
      toast.error("Failed to update user role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Edit Role
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User Role</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 py-4">
            <Label htmlFor="role">Role</Label>
            <Select
              value={role}
              onValueChange={(newRole) => setRole(newRole)}
              defaultValue={currentRole}
            >
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="PSYCHOLOGY">Psychologist</SelectItem>
                <SelectItem value="USER">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="gap-3 md:gap-0">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={updateRole} disabled={loading}>
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}